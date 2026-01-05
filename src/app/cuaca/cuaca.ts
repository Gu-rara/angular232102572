import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { secret } from '../../environments/environment.secret';
import { CommonModule } from '@angular/common';

declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-cuaca',
  imports: [Header, Sidebar, Footer, CommonModule],
  templateUrl: './cuaca.html',
  styleUrls: ['./cuaca.css'],
})
export class Cuaca implements AfterViewInit {
  private table1: any;
  currentWeather: any;
  cityData: any;
  todayDate: string = '';

  constructor(private renderer: Renderer2, private http: HttpClient) {}
  ngAfterViewInit() {
    // Defer DataTable initialization until the table element exists in the DOM
    // (the table is inside an *ngIf that hides it until we have data).
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapse');
  }

  // Initialize DataTable when the table is present. Safe to call multiple times.
  private initTable(): void {
    try {
      // If already initialized, do nothing
      if (this.table1) { return; }

      // Ensure the table element exists on the page
      if (!$('#table1') || $('#table1').length === 0) { return; }

      this.table1 = $('#table1').DataTable({
        // define columns matching the table <thead>
        columns: [
          { data: 0 },
          { data: 1 },
          { data: 2 },
          { data: 3 }
        ],
        columnDefs: [
          {
            targets: 0,
            render: function (data: string){
              const waktu = moment(data + " UTC");
              const html = waktu.local().format("YYYY-MM-DD") + "<br/>" + waktu.local().format("HH:mm") + " WIB";
              return html;
            }
          }, {
            targets: [1],
            render: function (data: string){
              return "<img src='" + data + "' style='filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.5));' />";
            }
          }, {
            targets: [2],
            render: function (data: string){
              const array = (data || '').split("||");
              const cuaca = array[0] || '';
              const deskripsi = array[1] || '';
              const html = "<strong>" + cuaca + "</strong><br/>" + deskripsi;
              return html;
            }
          }
        ]
      });
    } catch (e) {
      // Fail silently — DataTable may not be available during tests or server-side rendering
      console.error('Failed to initialize DataTable', e);
      this.table1 = null;
    }
  }

  getData(cityName: string) : void{
    cityName = encodeURIComponent(cityName);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${secret.app_id2}`;
    this.http.get(url).subscribe((data: any) => {
      const list = data.list || [];

      // store city info and a current-weather snapshot for the template
      this.cityData = data.city || null;
      this.currentWeather = list.length ? list[0] : null;

      // set a readable date for the header
      try {
        this.todayDate = moment().local().format('dddd, DD MMMM YYYY');
      } catch (e) {
        this.todayDate = new Date().toLocaleDateString();
      }

      console.log(list);

      // collect rows first; table may not be initialized yet because the table
      // element is rendered conditionally by *ngIf. We'll add rows after
      // initialization in a next-tick callback.
      const rows: any[] = [];

      list.forEach((element: any) => {
        const weather = (element.weather && element.weather[0]) || {};

        console.log(weather);

        const iconURL = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        const cuacaDeskripsi = (weather.main || '') + `|| ` + (weather.description || '');

        const main = element.main || {};
        const tempCelsius = this.kelvinToCelsius(main.temp || 0).toFixed(2);

        const row = [element.dt_txt, iconURL, cuacaDeskripsi, tempCelsius + ' °C'];
        rows.push(row);
      });

      // schedule adding rows after the DOM updates and table is available
      setTimeout(() => {
        this.initTable();
        if (this.table1) {
          // clear again to be safe and add all rows
          this.table1.clear();
          rows.forEach(r => this.table1.row.add(r));
          this.table1.draw(false);
        }
      }, 0);
    }, (error: any) => {
      alert(error.error?.message || error.message || 'Request failed');
      if (!this.table1) { this.initTable(); }
      if (this.table1) {
        this.table1.clear();
        this.table1.draw(false);
      }
    });
  }

  kelvinToCelsius(kelvin: number) : number {
    return kelvin - 273.15;
  }

  handleEnter(event: any) : void {
    const cityName = event.target.value;

    if(cityName && cityName.trim() != ""){
      if (this.table1) {
        this.table1.clear();
        this.table1.draw(false);
      }
    }

    this.getData(cityName);
  }

  calculateDewPoint(temp: number, humidity: number): number {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
  }

  getWindDirection(deg: number): string {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    return directions[Math.round(deg / 45) % 8];
  }

  getWeatherIconURL(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  // Return a CSS transform string for rotating an icon. Accepts number or string.
  rotate(deg: number | string | undefined | null): string {
    const d = Number(deg) || 0;
    return `rotate(${d}deg)`;
  }
}

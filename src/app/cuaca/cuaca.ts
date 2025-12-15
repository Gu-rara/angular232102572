import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { secret } from '../../environments/environment.secret';

declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-cuaca',
  imports: [Header, Sidebar, Footer],
  templateUrl: './cuaca.html',
  styleUrl: './cuaca.css',
})
export class Cuaca implements AfterViewInit {
  private table1: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {}
  ngAfterViewInit() {
    this.table1 = $('#table1').DataTable(
      {
        "columnDefs": [
          {
            "targets": 0,
            render: function (data: string){
              const waktu = moment(data + " UTC");
              const html = 
                waktu.local().format("YYYY-MM-DD") + "<br/>" + waktu.local().format("HH:mm") + " WIB";
              return html;
            }
          }, {
            "targets": [1],
            render: function (data: string){
              return "<img src='" + data + "' style='filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.5));' />";
            }
          }, {
            "targets": [2],
            render: function (data: string){
              const array = data.split("||");
              const cuaca = array[0];
              const deskripsi = array[1];
              const html = "<strong>" + cuaca + "</strong><br/>" + deskripsi;
              return html;
            }
          }]
      }
    );
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapse');
  }

  getData(cityName: string) : void{
    cityName = encodeURIComponent(cityName);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${secret.app_id2}`;
    this.http.get(url).subscribe((data: any) => {
      let list = data.list;

      console.log(list);

      this.table1.clear();

      list.forEach((element: any) => {
        const weather = element.weather[0];

        console.log(weather);

        const iconURL = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        const cuacaDeskripsi = weather.main + `|| ` + weather.description;
        
        const main = element.main;
        const tempCelsius = this.kelvinToCelsius(main.temp).toFixed(2);
        const tempMinCelsius = this.kelvinToCelsius(main.temp_min).toFixed(2);
        const tempMaxCelsius = this.kelvinToCelsius(main.temp_max).toFixed(2);

        const row = [element.dt_txt, iconURL, cuacaDeskripsi, tempCelsius + " °C"];
        this.table1.row.add(row);
      });
      this.table1.draw(false);
    }, (error : any) => {
      alert(error.error.message);
      this.table1.clear();
      this.table1.draw(false);
    });
  }

  kelvinToCelsius(kelvin: number) : number {
    return kelvin - 273.15;
  }

  handleEnter(event: any) : void {
    const cityName = event.target.value;

    if(cityName && cityName.trim() != ""){
      this.table1.clear();
      this.table1.draw(false);
    }

    this.getData(cityName);
  }
}

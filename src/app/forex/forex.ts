import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { environment } from '../../environments/environment';
import { formatCurrency } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [Header, Sidebar, Footer],
  templateUrl: './forex.html',
  styleUrl: './forex.css',
})
export class Forex implements AfterViewInit {
  private _table1 : any;
  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}
  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this._table1 = $('#table1').DataTable({
      "columnDefs": [{
        "targets": 3,
        "className": "text-right"
      }]
    });
    this.BindTable();
  }

  BindTable(): void {
    console.log("BindTable Forex");
    const ratesUrl = `https://openexchangerates.org/api/latest.json?app_id=${environment.appId}`;

    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";
    this.httpClient.get(currenciesUrl).subscribe((currenciesData: any) => {
      this.httpClient.get(ratesUrl).subscribe((ratesData: any) => {
        $("#tanggal").html("Data per tanggal " + this.formatDate(new Date(ratesData.timestamp * 1000)));
        const rates = ratesData.rates;
        let index = 1;

        for (const currencies in rates) {
          const currencyName = currenciesData[currencies];

          var rate = rates.IDR / rates[currencies];
          //check if its rate idr, then don't divide
          if (currencies === 'IDR') {
            rate = rates.IDR;
          }
          const formatRate = formatCurrency(rate, 'en-US', '', currencies);

          console.log(`${currencies} - ${currencyName} : ${formatRate}`);

          const row = [index++, currencies, currencyName, formatRate];
          this._table1.row.add(row);
        }
        this._table1.draw();
      });
    });
  }
  formatDate(arg0: Date) {
    const year = arg0.getFullYear();
    const month = ('0' + (arg0.getMonth() + 1)).slice(-2);
    const day = ('0' + arg0.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}

import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard3',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard3.html',
  styleUrl: './dashboard3.css'
})
export class Dashboard3 {

}

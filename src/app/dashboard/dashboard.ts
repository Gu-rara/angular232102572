import { Footer } from './../footer/footer';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}

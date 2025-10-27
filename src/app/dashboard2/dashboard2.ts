import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard2',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard2.html',
  styleUrl: './dashboard2.css'
})
export class Dashboard2 {

}

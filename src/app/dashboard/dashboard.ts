import { Footer } from './../footer/footer';
import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  ngOnInit(): void {
    console.log("Dashboard Component Loaded!");
    const existingScript = document.querySelector('script[src="dist/js/pages/dashboard.js"]');
    if(existingScript){
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = '/dist/js/pages/dashboard.js';
    script.async = false;
    document.body.appendChild(script);
  }
}

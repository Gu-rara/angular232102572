import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard3',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard3.html',
  styleUrl: './dashboard3.css'
})
export class Dashboard3 implements OnInit {
  ngOnInit(): void {
    console.log("Dashboard 3 Component Loaded!");
    const existingScript = document.querySelector('script[src="dist/js/pages/dashboard3.js"]');
    if(existingScript){
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = '/dist/js/pages/dashboard3.js';
    script.async = false;
    document.body.appendChild(script);
  }
}

import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard2',
  imports: [Header, Sidebar, Footer],
  templateUrl: './dashboard2.html',
  styleUrl: './dashboard2.css'
})
export class Dashboard2 implements OnInit {
  ngOnInit(): void {
    console.log("Dashboard 2 Component Loaded!");
    const existingScript = document.querySelector('script[src="dist/js/pages/dashboard2.js"]');
    if(existingScript){
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = '/dist/js/pages/dashboard2.js';
    script.async = false;
    document.body.appendChild(script);
  }
}

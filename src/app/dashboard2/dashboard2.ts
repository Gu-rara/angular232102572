import { Component, OnInit, Renderer2 } from '@angular/core';
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
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapse');
  }
  ngOnInit(): void {
    console.log("Dashboard 2 Component Loaded!");
    //dist/js/adminlte.js
    document.body.querySelectorAll('script[src="/dist/js/pages/dashboard.js"]').forEach(el => el.remove());
    document.body.querySelectorAll('script[src="/dist/js/pages/dashboard2.js"]').forEach(el => el.remove());
    document.body.querySelectorAll('script[src="/dist/js/pages/dashboard3.js"]').forEach(el => el.remove());
    const script = document.createElement('script');
    script.src = '/dist/js/pages/dashboard2.js';
    script.async = false;
    document.body.appendChild(script);
  }
}

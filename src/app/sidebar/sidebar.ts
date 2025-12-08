import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() moduleName: string = '';
  username: string = '';
  _header = document.querySelector('.main-header') as HTMLElement;

  ngAfterViewInit() {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    //this.renderer.addClass(document.body, 'sidebar-collapse');
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('userId');

    const saved = localStorage.getItem('adminlte-theme');

    if (saved == 'dark') {
      document.body.classList.add('dark-mode');

      if (this._header) {
        this._header.classList.remove('navbar-light');
        this._header.classList.add('navbar-dark');
      }
    } else {
      document.body.classList.remove('dark-mode');
      if (this._header) {
        this._header.classList.remove('navbar-dark');
        this._header.classList.add('navbar-light');
      }
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
    if (this._header) {
      this._header.classList.toggle('navbar-dark');
      this._header.classList.toggle('navbar-light');
    }

    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
    }
    localStorage.setItem('adminlte-theme', theme);
  }

  constructor(private renderer: Renderer2, private cookieService: CookieService) {}
}

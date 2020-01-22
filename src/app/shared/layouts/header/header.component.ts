import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) {
      // trick loader into reloading component on each routerlink
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
  }

  ngOnInit() {
  }

  searchShows(data) {
    this.router.navigate(['/search/shows/', data.value.searchTerm])
    data.reset();
  }

}

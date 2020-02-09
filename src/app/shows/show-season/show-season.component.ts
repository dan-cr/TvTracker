import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { TmdbApiService } from '../../core/services/tmdb-api.service';
import { DataService } from '../../core/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-season',
  templateUrl: './show-season.component.html',
  styleUrls: ['./show-season.component.scss']
})
export class ShowSeasonComponent implements OnInit {

  private showId: number;
  private showName: string;
  private seasonNumber: string;
  public seasonData;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbApiService,
    private data: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.showId = this.route.snapshot.params['id'];
    this.seasonNumber = this.route.snapshot.params['seasonNo'];
    this.showName = this.data.getCurrentShow();

    this.tmdb.getShowSeason(this.showId, this.seasonNumber).subscribe(season => {
      this.seasonData = season;
    });
  }

  // Navigate to previous location
  navigateBack() {
    this.location.back();
  }

}

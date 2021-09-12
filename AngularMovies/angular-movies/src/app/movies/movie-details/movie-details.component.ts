import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoordinatesMapWithMessage } from 'src/app/utilities/map/coordinate';
import { MovieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { RatingService } from 'src/app/utilities/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDTO;
  releaseDate: Date;
  // this way we are iforming angular it is a safe url
  trailerURL: SafeResourceUrl;
  coordinates: CoordinatesMapWithMessage[] = [];

  constructor(private moviesService: MoviesService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private ratingsService: RatingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService.getById(params.id).subscribe((movie) => {
        console.log(movie);
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        // we will parse our url for the trailer to generate necessary url to
        // display the video
        this.trailerURL = this.generateYoutubeURLForEmbeddedVideo(movie.trailer);
        this.coordinates = movie.movieTheaters.map(movieTheater => {
          return {latitude: movieTheater.latitude, longitude: movieTheater.longitude,
            message: movieTheater.name};
        });
      });
    });
  }

  generateYoutubeURLForEmbeddedVideo(url: any): SafeResourceUrl{
    if (!url){
      return '';
    }
    // https://www.youtube.com/watch?v=LKFuXETZUsI
    // whatever comes after v= (ovoga gore) is the id of the video
    let videoId = url.split('v=')[1];
    // ampersand is &
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1){
      videoId = videoId.substring(0, ampersandPosition);
    }
  // here we are finally generating the saferesorce url for our youtube video
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

 onRating(rate: number){
     this.ratingsService.rate(this.movie.id, rate).subscribe(() => {
      Swal.fire('Success', 'Your vote has been received', 'success');
    });
  }
}




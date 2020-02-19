import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, AfterViewInit {
  private id: string;
  public video: any;
  public YT: any;
  public player: any;
  public clicked: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
    this.apiService.getVideo(this.id)
      .subscribe((video)=> {
        this.video = video;
      })

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  ngAfterViewInit() {
    let videoId = this.video.url.split('?v=')[1]
    // @ts-ignore
    this.player = new YT.Player('player', {
      height: '450',
      width: '100%',
      videoId: videoId,
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onError': this.onPlayerError.bind(this)
      }
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
    // this.errorMsg = null;
  }

  onPlayerError(event) {
    if (event.data == 2) {
      // this.errorMsg = 'The url seems to be invalid'
    }
  }

  updateVideo(video) {
    this.clicked = true;
    this.apiService.udpateVideo(video._id,video.tags)
      .subscribe((updatedVideo)=> {
        this.clicked = false;
        this._snackBar.open('Tags have been updated!', 'Yay', {
          duration: 4000,
        });
      },
      (error) => {
        // this.errorMsg = error.error.message;
      })
  }


}

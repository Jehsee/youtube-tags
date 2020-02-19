import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Video } from 'src/app/model/video';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public YT: any;
  public player: any;
  public allVideos: Array<Video>;
  public videos: Array<Video>;
  public errorMsg: string;
  public columns = ['videoUrls','videoTags','update'];

  length:number;
  pageSize = 5;
  pageSizeOptions: number[] = [5,10,25];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initYoutubeScript();
    this.apiService.getVideos()
      .subscribe((videos: Video[]) => {
        this.allVideos = videos;
        this.length = videos.length;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      },
      () => {
        this.loadAllVideos(5, 0)
      })
  }
  
  initYoutubeScript() {
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
  }

  loadAllVideos(pageSize, pageIndex) {
    let start = pageSize * pageIndex;
    let end = start + pageSize;
    this.videos = this.allVideos.slice(start,end)
    this.videos.forEach((p,i) => {
      setTimeout(() => {
        this.onYouTubeIframeAPIReady(p,i);
      }, 13)
    })
  }

  onYouTubeIframeAPIReady(video, index) {
    let videoId = video.url.split('?v=')[1]
    let playerId = `player-${index}`;

    // @ts-ignore
    new YT.Player(playerId, {
      height: 250,
      width: '75%',
      videoId: videoId
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  updateVideo(video) {
    this.apiService.udpateVideo(video._id,video.tags)
      .subscribe((updatedVideo)=> {
      },
      (error) => {
        this.errorMsg = error.error.message;
      })
  }

  paginate(event) {
    this.loadAllVideos(event.pageSize, event.pageIndex)
  }

}

import { Component, OnInit, ViewChild, HostListener, Input, AfterViewInit, Host } from '@angular/core';
import { interval, timer } from 'rxjs';
import {Component, HostListener, OnInit} from '@angular/core';
import { ModalService } from '../services/modal.service';
import { map } from 'rxjs/operators';
import { MapComponent } from '../map/map.component';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';
import { KEY_CODE } from '../button-click/button-click.component';
import { Router } from '@angular/router';
import {KEY_CODE} from "../button-click/button-click.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  unlocked: boolean = false;
  counter = 0;
  timeout = 0;
  amount = .25;
  rate = 0;
  inter;

  @ViewChild(MapComponent)
  mapComp: MapComponent;
  gumUnlocked: boolean = false;
  musicUnlocked: boolean = false;
  happyMealUnlocked: boolean = false;
  cubeUnlocked: boolean = false;
  movieUnlocked: boolean = false;
  dotUnlocked: boolean = false;
  concertUnlocked: boolean = false;

  // modalUnlocked: boolean = false;

  moneyEarned = 0.00;
  itemToDisplay = 'Gum';

  height = 10;
  boxMargin = 0;

  constructor(private modalService: ModalService,
  private route:Router) {}

  ngAfterViewInit(){
    this.rate = this.mapComp.rate;
    console.log(this.rate);
  }

  ngOnInit() {

    this.route.routerState.root.queryParams.subscribe(
      params => this.rate = params['rate']
    );

    const secondsCounter = interval(1000);
    const mytimeout = interval(1000);
    const newCounter = secondsCounter.pipe(map(x => this.rate));

    newCounter.subscribe(x => this.moneyEarned += (Number(x)));
    mytimeout.subscribe(n => {
      if ((this.timeout++) > 5) {
        this.counter = 0;
        clearInterval(this.inter);
      } else {
        this.expandBar();
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  KeyEventsPlugin(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.SPACE) {
      this.timeout = 0;
    }

  }

  openModal() {
    console.log('I opened modal!');
    // document.getElementById("modal").style.opacity='1';
    document.getElementById("modal").style.display="block";
    // document.body.style.backgroundColor='gray';
  }

  keepPlaying(name: string) {
    document.getElementById(name+"Modal").style.display="none";
    this.gumUnlocked = true;
  }

  spendMoney(name:string) {
    document.getElementById(name+"Modal").style.display="none";
    console.log('spending my money and closing out now.');
    document.getElementById("spentModal").style.display="block";
  }

  // changeImage(id: string) {
  //   if(document.getElementById(id).src === 'happy-meal-sil.png') {
  //     document.getElementById('happy-meal').src == 'happy-meal.png'
  //   }
  // }
  lowerView(){
    // console.log("bro!")
    this.boxMargin += 10;
    document.getElementById('bigBox').style.marginTop = this.boxMargin+'px';
    document.getElementById("Lt2earn").style.marginTop = '-'+this.boxMargin+'px';
    document.getElementById("Rt2earn").style.marginTop = '-'+this.boxMargin+'px';
  }
  expandBar() {
    this.moneyEarned += 0.04;
    window.scrollTo(0,0);
    // this.moneyEarned += 0.04;

    console.log(this.moneyEarned);
    this.height += this.moneyEarned;
    document.getElementById('progressBar').style.height = this.height+'px';
    this.lowerView()
    if(this.moneyEarned >= 50) {
      this.concertUnlocked = true;
      document.getElementById("concertModal").style.display="block";
    }else if(this.moneyEarned >= 25.00 && this.moneyEarned <= 25.04) {
      this.dotUnlocked = true;
      document.getElementById("dotModal").style.display="block";
    }else if(this.moneyEarned >= 13.00 && this.moneyEarned <= 13.04) {
      this.movieUnlocked = true;
      document.getElementById("movieModal").style.display="block";
    }else if(this.moneyEarned >= 5.00 && this.moneyEarned <=5.04) {
      this.cubeUnlocked = true;
      document.getElementById("cubeModal").style.display="block";
    }else if(this.moneyEarned >= 3.00 && this.moneyEarned <= 3.02) {
      this.happyMealUnlocked = true;
      document.getElementById("happyMealModal").style.display="block";
    }else if(this.moneyEarned >= 0.99 && this.moneyEarned <= 1.03) {
      this.musicUnlocked = true;
      document.getElementById("musicModal").style.display="block";
    }else if(this.moneyEarned >= 0.25 && this.moneyEarned <= 0.28) {
      this.gumUnlocked = true;
      document.getElementById("gumModal").style.display="block";
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.expandBar()
  }
  goHome() {
    this.route.navigate(['home'])
  }
}

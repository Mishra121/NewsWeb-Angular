import { Component, OnInit, 
  ViewChild, ElementRef,
  Output, EventEmitter 
} from '@angular/core';


import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('inputVal') inputVal: ElementRef;

  searchText: string;
  categoryText: string;
  @Output() search = new EventEmitter(); 
  @Output() CategorySearch = new EventEmitter();

  constructor(private newsService: NewsService) { }

  articles: any;

  ngOnInit() {
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  searchClicked(){
    this.searchText = this.inputVal.nativeElement.value;
    if(this.searchText != null || this.searchText != ''){
      this.search.emit(this.searchText);
    }
  }

  CategoryClicked($event) {
    this.categoryText = $event.target.text;
    this.CategorySearch.emit(this.categoryText);
  }

  FetchHeadlines() {
    this.newsService.GetAll().subscribe((result) => {
      this.newsService.newsArticles = [];

      this.articles = result;
      
      this.articles.articles.forEach(element => {
        this.newsService.newsArticles.push(this.newsService.CustomMapper(element));
      });
    })
  }
}

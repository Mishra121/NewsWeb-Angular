import { Component, OnInit } from '@angular/core';
import { NewsModel } from '../shared/news.model';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles: any;
  temp: NewsModel = new NewsModel;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.FetchHeadlines();
  }

  FetchHeadlines() {
    this.newsService.GetAll().subscribe((result) => {
      this.articles = result;
      
      this.articles.articles.forEach(element => {
        this.newsService.newsArticles.push(this.newsService.CustomMapper(element));
      });
    })
  }
}

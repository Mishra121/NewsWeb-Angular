import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { NewsService } from './shared/news.service';
import { NewsModel } from './shared/news.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsWeb';

  searchText = "";
  resultSet : any;

  constructor(private newsService : NewsService) { }

  filterNewsByCategory(text: string){
    console.log(text);

    this.newsService.GetCategory(text).subscribe((result) => {
      this.newsService.newsArticles = [];

      this.resultSet = result;

      this.resultSet.articles.forEach(element => {
        this.newsService.newsArticles.push(this.newsService.CustomMapper(element));
      });
    })
  }

  searchNews(text: string){
   
    this.newsService.GetSearch(text)
    .subscribe((result) => {
      this.newsService.newsArticles = [];

      this.resultSet = result;
      
      this.resultSet.articles.forEach(element => {
        this.newsService.newsArticles.push(this.newsService.CustomMapper(element))
      })
    })
  }
}

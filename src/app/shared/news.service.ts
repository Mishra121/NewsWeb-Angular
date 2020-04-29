import { Injectable } from '@angular/core';
import {NewsModel} from './news.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  newsArticles:NewsModel[] = [];
  temp:NewsModel = new NewsModel;
  category: string
  query: string

  newsApiKey = "9a85d309fc4e4aedb637400afb987454";
  newsUrl = "http://newsapi.org/v2/top-headlines?country=in&apiKey=9a85d309fc4e4aedb637400afb987454";

  GetAll(){
    return this.http.get(this.newsUrl);
  }

  GetCategory(text: string){
    this.category = text;
    return this.http.get('http://newsapi.org/v2/top-headlines?country=in&category='+this.category +'&apiKey=' + this.newsApiKey);
  }

  GetSearch(searchQ: string){
    this.query = searchQ;
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=in&q=${this.query}&apiKey=${this.newsApiKey}`);
  }

  public CustomMapper(item): NewsModel {
    this.temp = new NewsModel;

    this.temp.title = item["title"];
    this.temp.description = item["description"];
    this.temp.urlToImage = item["urlToImage"];
    this.temp.newsUrl = item["url"];
    this.temp.publishedDate = item["publishedAt"];

    return this.temp;
  }
}

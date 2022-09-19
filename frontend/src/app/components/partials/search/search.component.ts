import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   searchTerm = '';

  constructor(activatedRoute: ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) =>{
      if(params.searchTerm) this.searchTerm = params.seachTerm;

    })
     }

  ngOnInit(): void {
  }
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term)
  }
}

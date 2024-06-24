import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ratings = [
    {
      name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      content:
        'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
      rate: 4.0
    },
    {
      name: 'qui est esse',
      content:
        'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla',
      rate: 3.8
    },
    {
      name: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      content:
        'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut',
      rate: 4.5
    },
    {
      name: 'eum et est occaecati',
      content:
        'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit',
      rate: 3.4
    }
  ];
}

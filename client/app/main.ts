import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { AppComponent } from './components/app.component';
import { Socket } from "phoenix_js";

let pjs = provide(Socket, { useFactory: () => {
  return new Socket("ws://localhost:4000/socket", {});
} });

bootstrap(AppComponent, [pjs]);
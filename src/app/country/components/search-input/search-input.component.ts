import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styles: ``
})
export class SearchInputComponent {

  placeholder = input<string>('Buscar');
  initialValue = input<string>();

  value = output<string>();

  // inputValue = signal<string>(this.initialValue() ?? '');
  inputValue = linkedSignal<string>(()=>this.initialValue() ?? ''); //espera el proceso termine para recien activar el initialValue

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue();

    const timeout = setTimeout(()=>{
      this.value.emit(value);
    }, 500);

    onCleanup(()=>{
      clearTimeout(timeout);
    });
  });

}

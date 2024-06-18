import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockageServiceService {

  private namesSubject: BehaviorSubject<string[]>; // BehaviorSubject pour émettre des mises à jour du tableau
  namesObservable: Observable<string[]>; // Observable pour que les composants puissent s'abonner aux changements

  private actionsSubject: BehaviorSubject<string[]>; // BehaviorSubject pour émettre des mises à jour du tableau
  actionsObservable: Observable<string[]>; // Observable pour que les composants puissent s'abonner aux changements

  constructor() {
    this.namesSubject = new BehaviorSubject<string[]>([]);
    this.namesObservable = this.namesSubject.asObservable();

    this.actionsSubject = new BehaviorSubject<string[]>([]);
    this.actionsObservable = this.actionsSubject.asObservable();
  }

  // Méthode pour récupérer toutes les chaînes
  getNamesList(): string[] {
    return this.namesSubject.getValue();
  }

  // Méthode pour ajouter une chaîne
  addNameToNamesList(newString: string): void {
    const currentStrings = this.getNamesList();
    const updatedStrings = [...currentStrings, newString];
    this.namesSubject.next(updatedStrings);
  }

  // Méthode pour supprimer une chaîne
  deleteNameFormNamesList(index: number): void {
    const currentStrings = this.getNamesList();
    const updatedStrings = currentStrings.filter((_, i) => i !== index);
    this.namesSubject.next(updatedStrings);
  }

  getActionsList(): string[] {
    return this.actionsSubject.getValue();
  }

  // Méthode pour ajouter une chaîne
  addActionToActionsList(newString: string): void {
    const currentStrings = this.getActionsList();
    const updatedStrings = [...currentStrings, newString];
    this.actionsSubject.next(updatedStrings);
  }

  // Méthode pour supprimer une chaîne
  deleteActionFormActionsList(index: number): void {
    const currentStrings = this.getActionsList();
    const updatedStrings = currentStrings.filter((_, i) => i !== index);
    this.actionsSubject.next(updatedStrings);
  }
}

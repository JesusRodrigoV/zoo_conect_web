import { BackendAnimalResponse, AnimalAdapter, CreateAnimalRequest } from '@adapters/animales';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Animal } from '@models/animales';
import { environment } from '@env';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAnimales {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;
  private readonly animalesUrl = `${this.apiUrl}/animals/animals`;

  /**
   * Crear un nuevo animal
   * @param animalData - Datos del animal a crear
   * @returns Observable con el animal creado
   */
  createAnimal(animalData: CreateAnimalRequest): Observable<Animal> {
    return this.http
      .post<BackendAnimalResponse>(this.animalesUrl, animalData)
      .pipe(map((animal) => AnimalAdapter.fromBackend(animal)));
  }

  /**
   * Obtener lista de animales con paginación
   * @param skip - Número de registros a omitir
   * @param limit - Número máximo de registros
   * @returns Observable con array de animales
   */
  getAllAnimals(skip: number = 0, limit: number = 100): Observable<Animal[]> {
    return this.http
      .get<BackendAnimalResponse[]>(this.animalesUrl, {
        params: { skip, limit },
      })
      .pipe(
        map((animals) =>
          animals.map((animal) => AnimalAdapter.fromBackend(animal))
        )
      );
  }

  /**
   * Obtener animal por ID
   * @param animalId - ID del animal
   * @returns Observable con el animal encontrado
   */
  getAnimalById(animalId: number): Observable<Animal> {
    return this.http
      .get<BackendAnimalResponse>(`${this.animalesUrl}/${animalId}`)
      .pipe(map((animal) => AnimalAdapter.fromBackend(animal)));
  }

  /**
   * Actualizar datos de un animal
   * @param animalId - ID del animal a actualizar
   * @param animalData - Datos parciales del animal
   * @returns Observable con el animal actualizado
   */
  updateAnimal(animalId: number, animalData: Partial<CreateAnimalRequest>): Observable<Animal> {
    return this.http
      .put<BackendAnimalResponse>(`${this.animalesUrl}/${animalId}`, animalData)
      .pipe(map((animal) => AnimalAdapter.fromBackend(animal)));
  }

  /**
   * Eliminar un animal
   * @param animalId - ID del animal a eliminar
   * @returns Observable de la operación
   */
  deleteAnimal(animalId: number): Observable<void> {
    return this.http.delete<void>(`${this.animalesUrl}/${animalId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from '../models/location.model';

export const mapHost = 'https://nominatim.openstreetmap.org';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient) { }

  getGeocode(address: string, postalCode: string): Observable<ILocation | null> {
    return this.http.get<any[]>(`${mapHost}/search?q=${address}+${postalCode}&format=json`)
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return { longitude: response[0].lon, latitude: response[0].lat };
          }
          return null;
        })
      );
  }

  getGeocodeStructured(address: string, postalCode: string, city?: string): Observable<ILocation | null> {
    let url = `${mapHost}/search?street=${address}&postalcode=${postalCode}&format=json`;
    if (city) {
      url += `&city=${city}`;
    }
    return this.http.get<any[]>(url)
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return { longitude: response[0].lon, latitude: response[0].lat };
          }
          return null;
        })
      );
  }
}

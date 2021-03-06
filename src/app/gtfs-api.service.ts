import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const GTFS_API_END = 'http://ec2-18-220-143-99.us-east-2.compute.amazonaws.com/api/v1';

export interface Agencies {
  agency_id: string;
  agency_lang: string;
  agency_name: string;
  agency_phone: string;
  agency_timezone: string;
  agency_url: string;
}

export interface Routes {
  agency_id: string;
  route_color: string;
  route_desc: string;
  route_id: string;
  route_long_name: string;
  route_short_name: string;
  route_text_color: string;
  route_type: string;
  route_url: string;
}

export interface Trips {
  direction_id: string;
  route_id: string;
  service_id: string;
  shape_id: string;
  trip_headsign: string;
  trip_id: string;
  wheelchair_accessible: string;
}

export interface Stops {
  stop_id: string;
  stop_lat: string;
  stop_lon: string;
  stop_name: string;
}

export interface Times {
  arrival_time: string;
  departure_time: string;
  drop_off_type: string;
  pickup_type: string;
  shape_dist_traveled: string;
  stop_id: string;
  stop_sequence: string;
  trip_id: string;
}
@Injectable({
  providedIn: 'root'
})
export class GTFSAPIService {
  constructor(private http: HttpClient) {}

  public getAgencies(): Promise<Agencies[]> {
    return this.http.get<Agencies[]>(`${GTFS_API_END}/agency`).toPromise();
  }

  public getRoutesByAgencyId(agency_id: string): Promise<Routes[]> {
    return this.http.get<Routes[]>(`${GTFS_API_END}/routes/agency_id/${agency_id}`).toPromise();
  }

  public getTripsByRouteId(route_id: string): Promise<Trips[]> {
    return this.http.get<Trips[]>(`${GTFS_API_END}/trips/route_id/${route_id}`).toPromise();
  }

  public getStopsByTripId(trip_id: string): Promise<Stops[]> {
    return this.http.get<Stops[]>(`${GTFS_API_END}/stop_times/trip_id/${trip_id}`).toPromise();
  }

  public getTimes(route_id: string, direction_id: string, stop_id: string): Promise<Times[]> {
    return this.http.get<Times[]>(`${GTFS_API_END}/times/route_id=${route_id}&directionId=${direction_id}&stop_id=${stop_id}`).toPromise();
  }
}

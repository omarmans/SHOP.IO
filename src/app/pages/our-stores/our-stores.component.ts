import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Store {
  id: number;
  name: string;
  address: string;
  government: string;
  phone?: string;
  website: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-our-stores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './our-stores.component.html',
  styleUrl: './our-stores.component.scss',
})
export class OurStoresComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery: string = '';
  selectedStore: Store | null = null;

  private map: any;
  private markers: any[] = [];
  private L: any;

  stores: Store[] = [
    {
      id: 1,
      name: 'فرع المعادي',
      address: '٣ شارع ٩، المعادي، القاهرة',
      government: 'القاهرة',
      phone: '02/25161234',
      website: 'stengeg.com',
      lat: 29.9626,
      lng: 31.2608,
    },
    {
      id: 2,
      name: 'فرع مدينة نصر',
      address: '٤٥ شارع عباس العقاد، مدينة نصر',
      government: 'القاهرة',
      phone: '02/24014567',
      website: 'stengeg.com',
      lat: 30.0626,
      lng: 31.3422,
    },
    {
      id: 3,
      name: 'فرع الهرم',
      address: '١٢ شارع الهرم، بجوار محطة المترو',
      government: 'الجيزة',
      phone: '02/35789012',
      website: 'stengeg.com',
      lat: 30.0019,
      lng: 31.21,
    },
    {
      id: 4,
      name: 'فرع التجمع الخامس',
      address: 'التجمع الخامس، بجوار مول مصر الجديدة',
      government: 'القاهرة',
      phone: '02/26103456',
      website: 'stengeg.com',
      lat: 30.0082,
      lng: 31.4777,
    },
    {
      id: 5,
      name: 'فرع إمبابة',
      address: '٧ شارع طلعت حرب، إمبابة',
      government: 'الجيزة',
      phone: '02/35219876',
      website: 'stengeg.com',
      lat: 30.0619,
      lng: 31.2089,
    },
    {
      id: 6,
      name: 'فرع المقطم',
      address: '٣٢ شارع الفتح، المقطم',
      government: 'القاهرة',
      phone: '02/25052345',
      website: 'stengeg.com',
      lat: 30.0154,
      lng: 31.3506,
    },
  ];

  filteredStores: Store[] = [];

  ngOnInit(): void {
    this.filteredStores = [...this.stores];
  }

  ngAfterViewInit(): void {
    this.loadLeaflet();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private loadLeaflet(): void {
    // Inject Leaflet CSS once
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // If already loaded, init immediately
    if ((window as any).L) {
      this.initMap((window as any).L);
      return;
    }

    // Otherwise load the script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => this.initMap((window as any).L);
    document.body.appendChild(script);
  }

  private initMap(L: any): void {
    this.L = L;

    this.map = L.map('storeMap', {
      center: [30.0444, 31.2357],
      zoom: 11,
      zoomControl: true,
    });

    // OpenStreetMap — free, no API key required
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);

    this.addMarkers();
  }

  private buildIcon(active = false): any {
    const bg = active ? '#000' : '#222';
    const border = active ? '#f0f0f0' : '#fff';
    return this.L.divIcon({
      className: '',
      html: `<div style="
        width:26px;height:26px;
        background:${bg};
        border:3px solid ${border};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,.4);
        transition:all .2s;
      "></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      popupAnchor: [0, -28],
    });
  }

  private addMarkers(): void {
    if (!this.L || !this.map) return;
    this.markers.forEach((m) => m.remove());
    this.markers = [];

    this.filteredStores.forEach((store) => {
      const marker = this.L.marker([store.lat, store.lng], {
        icon: this.buildIcon(),
      }).addTo(this.map);

      marker.on('click', () => {
        this.selectedStore = store;
        this.highlightMarker(marker);
      });

      (marker as any)._storeId = store.id;
      this.markers.push(marker);
    });
  }

  private highlightMarker(active: any): void {
    this.markers.forEach((m) => m.setIcon(this.buildIcon(m === active)));
  }

  selectStore(store: Store): void {
    this.selectedStore = store;
    if (this.map) {
      this.map.flyTo([store.lat, store.lng], 14, { duration: 0.8 });
    }
    const marker = this.markers.find((m) => (m as any)._storeId === store.id);
    if (marker) this.highlightMarker(marker);
  }

  filterStores(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredStores = q
      ? this.stores.filter(
          (s) =>
            s.name.includes(q) ||
            s.address.includes(q) ||
            s.government.includes(q),
        )
      : [...this.stores];
    this.addMarkers();
  }

  useMyLocation(): void {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      this.map?.flyTo([pos.coords.latitude, pos.coords.longitude], 13);
    });
  }

  openDirections(store: Store): void {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`,
      '_blank',
    );
  }

  closePopup(): void {
    this.selectedStore = null;
    this.markers.forEach((m) => m.setIcon(this.buildIcon(false)));
  }
}

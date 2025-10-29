import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      positionClass: 'toast-top-right', // ← المكان: أسفل يمين
      timeOut: 3000, // ← المدة بالمللي ثانية
      closeButton: true, // ← زرار إغلاق
      progressBar: true, // ← شريط التقدم
      newestOnTop: true, // ← الأحدث يظهر فوق
      tapToDismiss: true,
    }),
  ],
};

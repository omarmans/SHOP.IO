import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  ngOnInit() {
    const duration = 2000; // المدة اللي كل العدادات هتخلص فيها (2 ثانية)
    const intervalTime = 10; // كل قد إيه نزود القيمة
    const steps = duration / intervalTime; // عدد الخطوات = 200 خطوة

    this.stats.forEach((stat) => {
      const target = stat.value;
      stat.value = 0;
      const increment = Math.ceil(target / steps); // كام نزود في كل خطوة

      const counter = setInterval(() => {
        stat.value += increment;

        if (stat.value >= target) {
          stat.value = target;
          clearInterval(counter);
        }
      }, intervalTime);
    });
  }

  stats = [
    { name: 'International Brands', value: 200 },
    { name: 'High-Quality Products', value: 2000 },
    { name: 'Happy Customers', value: 30000 },
  ];
  brands = [
    {
      name: 'Versace',
      logo: 'versace.svg',
      link: 'https://www.faces.eg/ar/brands/versace',
    },
    {
      name: 'Zara',
      logo: 'zara.svg',
      link: 'https://www.zarahome.com/eg',
    },
    {
      name: 'c',
      logo: 'gucci-logo-1.svg',
      link: 'https://www.gucci.com/',
    },

    {
      name: 'Prada',
      logo: 'prada-logo-1.svg',
      link: 'http://puzzlesegypt.com/ar/collections/prada-bags',
    },
    {
      name: 'Calvin Klein',
      logo: 'calvin.svg',
      link: 'https://dstoreegypt.com/collections/calvin-klein',
    },
  ];
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingComponent } from './shipping.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'some-value' // Simula un parámetro de ruta
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
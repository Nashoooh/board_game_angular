import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnsComponent } from './returns.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ReturnsComponent', () => {
  let component: ReturnsComponent;
  let fixture: ComponentFixture<ReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'some-value' // Simula un parámetro de ruta
            }),
            queryParams: of({ search: 'test-query' }) // Simula los query params
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfImportComponent } from './pdf-import.component';

describe('PdfImportComponent', () => {
  let component: PdfImportComponent;
  let fixture: ComponentFixture<PdfImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

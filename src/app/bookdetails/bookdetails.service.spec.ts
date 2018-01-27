import { TestBed, inject } from '@angular/core/testing';

import { BookdetailsService } from './bookdetails.service';

describe('BookdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookdetailsService]
    });
  });

  it('should be created', inject([BookdetailsService], (service: BookdetailsService) => {
    expect(service).toBeTruthy();
  }));
});

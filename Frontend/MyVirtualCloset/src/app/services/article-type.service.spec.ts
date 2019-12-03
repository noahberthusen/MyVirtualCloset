import { TestBed } from '@angular/core/testing';

import { ArticleTypeService } from './article-type.service';

describe('ArticleTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleTypeService = TestBed.get(ArticleTypeService);
    expect(service).toBeTruthy();
  });
});

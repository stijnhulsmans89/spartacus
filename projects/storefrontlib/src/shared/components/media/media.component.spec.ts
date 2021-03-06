import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaComponent } from './media.component';
import { Media } from './media.model';
import { MediaService } from './media.service';

const mediaUrl = 'mockProductImageUrl.jpg';

class MockMediaService {
  getMedia(media): Media {
    return {
      src: media ? media.product.url : undefined,
      srcset: undefined,
      alt: undefined,
    };
  }
  getMissingImage() {
    return {
      src: 'missing.jpg',
    };
  }
}

const mockImageContainer = {
  product: { url: mediaUrl },
};

const mockMissingImageContainer = null;

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let service: MediaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaComponent],
      providers: [{ provide: MediaService, useClass: MockMediaService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    service = TestBed.inject(MediaService);
    component = fixture.componentInstance;
    component.container = mockImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create media object with valid image url', () => {
    expect(component.media.src).toEqual(mediaUrl);
  });

  it('should update the img element with image url', () => {
    expect(
      (<HTMLImageElement>(
        fixture.debugElement.query(By.css('img')).nativeElement
      )).src
    ).toContain(mediaUrl);
  });

  it('should contain is-loading classes while loading', () => {
    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-loading');
  });

  it('should update classes when loaded', () => {
    const load = new UIEvent('load');
    fixture.debugElement.query(By.css('img')).nativeElement.dispatchEvent(load);

    fixture.detectChanges();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).not.toContain('is-loading');
    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-initialized');
  });

  it('should have is-missing class when there is no image', () => {
    spyOn(service, 'getMedia').and.returnValue(null);
    component.container = mockMissingImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-missing');
  });
});

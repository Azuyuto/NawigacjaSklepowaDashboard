import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss']
})
export class ViewShopComponent implements OnInit, AfterViewInit {
  id: any;
  shop: any;
  @ViewChild('myCanvas', { static: false }) canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private objects: any[] = [];
  private selectedObject: any = null;
  private isResizing = false;
  private lastMoveX: number;
  private lastMoveY: number;
  public productList: any[];

  constructor(private route: ActivatedRoute, private shopService: ShopService, private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == 0)
    {
      this.shopService.getUserShop().subscribe({
        next: data => {
          this.shop = data.shop;
          console.log(data);
          this.updateShopData();
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else
    {
      this.shopService.getShop(this.id).subscribe({
        next: data => {
          this.shop = data.shop;
          console.log(data);
          this.updateShopData();
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  updateShopData() {
      // Products
      this.productService.getProductsByShopId(this.shop.id).subscribe({
        next: data => {
          this.productList = data.products;
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });

      // Shelves
      this.shopService.getShelves(this.shop.id).subscribe({
        next: data => {
          this.objects = data.shelves;
          this.drawObjects();
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      for (const obj of this.objects) {
        if (this.isInsideRectangle(mouseX, mouseY, obj)) {
          this.selectedObject = obj;
          this.selectedObject.color = "#7c5ccc";
          this.lastMoveX = mouseX;
          this.lastMoveY = mouseY;
          if (this.isResizeHandleClicked(mouseX, mouseY, obj)) {
            this.isResizing = true;
          }
          break;
        }
      }
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) =>{
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      if (this.selectedObject !== null) {
        if (this.isResizing) {
          const newWidth = mouseX - this.selectedObject.x;
          const newHeight = mouseY - this.selectedObject.y;
          this.selectedObject.width = newWidth > 0 ? newWidth : 0;
          this.selectedObject.height = newHeight > 0 ? newHeight : 0;
          this.drawObjects();
        } else {
          const deltaX = mouseX - this.lastMoveX;
          const deltaY = mouseY - this.lastMoveY;
          this.selectedObject.x += deltaX;
          this.selectedObject.y += deltaY;
          this.lastMoveX = mouseX;
          this.lastMoveY = mouseY;
          this.drawObjects();
        }
      }
    });

    canvas.addEventListener("mouseup", (event: MouseEvent) =>{
      this.isResizing = false;
      this.selectedObject.color = "#8859ff";
      this.selectedObject = null;
      this.drawObjects();
    });
  }

  addRectangle() {
    const rect = {
      id: 0,
      name: "X",
      x: 100, // przykładowe wartości
      y: 100,
      width: 100,
      height: 100,
      color: '#8859ff', // przykładowy kolor
    };
    this.objects.push(rect);
    this.drawObjects();
  }

  drawObjects() {
    this.clearCanvas();
    for (const obj of this.objects) {
      this.drawRectangle(obj);
    }
  }

  drawRectangle(rect: any) {
    this.ctx.strokeStyle = 'red';
    this.ctx.fillStyle = rect.color;
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  exportObjects() {
    this.resetColor();
    this.shopService.createShelves(this.shop.id, this.objects).subscribe({
      next: data => {
        setTimeout(() => {
          window.location.assign('/list-shop');
        }, 1500);
      },
      error: err => {
        console.log(err);
      }
    });
    console.log(this.objects);
  }

  isInsideRectangle(x: number, y: number, rect: any) {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  }

  isResizeHandleClicked(x: number, y: number, rect: any) {
    const handleSize = 8; // rozmiar uchwytu
    const resizeHandleX = rect.x + rect.width;
    const resizeHandleY = rect.y + rect.height;
    return x >= resizeHandleX - handleSize && x <= resizeHandleX && y >= resizeHandleY - handleSize && y <= resizeHandleY;
  }

  selectShelveByProduct(productId: any, shelfeId: any){
    this.resetColor();
    this.objects.find(a => a.id == shelfeId).color = "red";
    this.drawObjects();
  }

  resetColor(){
    this.objects.forEach(ob => {
      ob.color = "#8859ff"
    });
  }
}

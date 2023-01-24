export default {
  props: ["product"],
  template: `
    <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" ref="editModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            {{ product.id ? '編輯產品' : '新增商品'}}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <div class="row g-3 mb-3">
                <div class="col-6">
                  <h5>主要圖片</h5>
                  <img class="img-fluid mb-2" :src="product.imageUrl" />
                  <input type="file" class="form-control mb-2" accept="image/png, image/gif, image/jpeg"
                    @change="uploadImage($event, 0)" />
                  <input type="text" class="form-control" v-model="product.imageUrl" />
                </div>
              </div>
              <hr />
              <div class="row g-3">
                <div class="col-6" v-for="(image,index) in product.imagesUrl" :key="image" >
                  <img class="img-fluid mb-2" :src="image" />
                  <input type="file" class="form-control mb-2" accept="image/png, image/gif, image/jpeg"
                    @change="uploadImage($event, index + 1)" />
                  <input type="text" class="form-control" v-model="image" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="title" class="form-label">商品標題</label>
                  <input class="form-control" id="title" v-model="product.title" />
                </div>
                <div class="col-md-6">
                  <label for="category" class="form-label">商品分類</label>
                  <input class="form-control" id="category" v-model="product.category" />
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="content" class="form-label">商品短述</label>
                  <input class="form-control" id="content" v-model="product.content" />
                </div>
                <div class="col-md-6">
                  <label for="description" class="form-label">商品說明</label >
                  <input class="form-control" id="description" v-model="product.description" />
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input class="form-control" id="origin_price" type="number" v-model.number="product.origin_price" />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input class="form-control" id="price" type="number" v-model.number="product.price" />
                </div>
              </div>
              <div class="row g-3 mb-3 align-items-end">
                <div class="col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input class="form-control" id="unit" v-model="product.unit" />
                </div>
                <div class="col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="product.is_enabled" />
                    <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="editProduct" v-if="product.id" >
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-show="isSending"></span>
            更新
          </button>
          <button type="button" class="btn btn-primary" @click="addProduct" v-else >
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-show="isSending"></span>
            新增
          </button>
        </div>
      </div>
    </div>
  </div>`,
};

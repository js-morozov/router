<template>
  <div class="container">
    <h3 class="mt-4">Добавление товара</h3>
    <div class="row">
      <div class="col-4">
        <form class="card card-body my-2">
          <div class="form-group">
            <label for="name">Наименование товара</label>
            <input-data type="text" v-model="product.name"></input-data>
          </div>
          <div class="form-group">
            <label for="price">Цена</label>
            <input-data
              type="number"
              id="price"
              v-model.number="product.price"
            ></input-data>
          </div>
          <div class="form-group">
            <label for="quantity">Количество</label>

            <input-data
              type="number"
              id="quantity"
              v-model.number="product.quantity"
            ></input-data>
          </div>
          <div class="form-check mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              id="check"
              v-model="setMaxQuantity"
            />
            <label class="form-check-label" for="check">
              Установить ограничение на количество товаров
            </label>
          </div>
          <div class="form-group" v-if="setMaxQuantity">
            <input
              type="number"
              class="form-control"
              v-model.number="product.maxQuantity"
            />
          </div>
          <base-button
            title="Добавить товар в корзину"
            @click.native="addProductInCart"
          >
            <template slot="iconBefore">
              <i class="fas fa-shopping-cart"></i>
            </template>
          </base-button>
        </form>
      </div>
      <div class="col-4">
        <div class="card card-body my-2">
          <div class="form-group">
            <label for="filter">Фильтр по цене {{ filterPrice }}</label>
            <div class="d-flex">
              <span class="mr-2">{{ minPrice }}</span>
              <input
                type="range"
                class="form-control-range"
                id="filter"
                :min="minPrice"
                :max="maxPrice"
                step="100"
                v-model.number="filterPrice"
              />
              <span class="ml-2">{{ maxPrice }}</span>
            </div>
          </div>
          <base-button title="Применить" @click.native="getFilterPrice" />
        </div>
      </div>
    </div>
    <br />
    <h3 class="mt-4">Корзина</h3>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Наименование</th>
          <th scope="col">Цена</th>
          <th scope="col">Количество</th>
          <th scope="col">Стоимость</th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in basket" :key="index">
          <th scope="row">{{ index + 1 }}.</th>
          <td>
            {{ product.name }}
            <div
              class="alert alert-danger my-2"
              role="alert"
              v-if="!product.validQuantity"
            >
              Вы указали максимальное количество товара
            </div>
          </td>
          <td>{{ product.price | convertUSD }}</td>

          <td>
            <field-counter>
              <template slot="button-decrease">
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  -
                </button>
              </template>
              <template slot="button-increase">
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  +
                </button>
              </template>
            </field-counter>
          </td>
          <td>{{ product.totalPrice | convertUSD }}</td>
          <td class="text-right">
            <base-button
              title="Удалить"
              @click.native="removeProduct(index)"
              color="danger"
            />
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-right">
            <h3>
              <span class="badge badge-success"
                >Сумма к оплате - {{ totalPrice | convertUSD }}</span
              >
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseButton from "./controls/BaseButton";
import FieldCounter from "./controls/FieldCounter";
import InputData from "./controls/InputData";

export default {
  name: "Counter",
  components: { BaseButton, FieldCounter, InputData },
  // props: {
  //   title: {
  //     type: String,
  //     default: "",
  //   },
  //   color: {
  //     type: String,
  //     default: "success",
  //   },
  // },
  data() {
    return {
      filterPrice: 0,
      product: {
        name: "",
        price: 0,
        quantity: 0,
        maxQuantity: 0,
        totalPrice: 0,
        validQuantity: true,
      },
      setMaxQuantity: false,
      basket: [
        {
          name: "Телевизор LG",
          price: 3600,
          quantity: 1,
          maxQuantity: 3,
          totalPrice: 3600,
          validQuantity: true,
        },
        {
          name: "Стол IKEA 3000",
          price: 75,
          quantity: 2,
          maxQuantity: 5,
          totalPrice: 150,
          validQuantity: true,
        },
        {
          name: "Стул",
          price: 20,
          quantity: 5,
          maxQuantity: 10,
          totalPrice: 100,
          validQuantity: true,
        },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.basket.reduce((summa, product) => {
        summa += product.totalPrice;
        return summa;
      }, 0);
    },
    minPrice() {
      return Math.min(
        ...this.basket.map((item) => {
          return item.price;
        })
      );
    },
    maxPrice() {
      return Math.max(
        ...this.basket.map((item) => {
          return item.price;
        })
      );
    },
  },
  filters: {
    convertUSD(byn) {
      return byn;
      // return Math.round(byn / 2.6) + "$";
    },
  },
  watch: {
    name(value) {
      if (value.length > 10) {
        this.name = value.substr(0, 10);
      }
    },
  },
  methods: {
    addProductInCart() {
      const {
        name,
        price,
        quantity,
        maxQuantity,
        validQuantity,
      } = this.product;
      this.basket.push({
        name,
        price,
        quantity,
        totalPrice: quantity * price,
        maxQuantity,
        validQuantity,
      });
      this.clearProductAddFrom();
    },
    getFilterPrice() {
      this.basket = this.basket.filter(
        (item) => item.price <= this.filterPrice
      );
    },
    removeProduct(index) {
      this.basket.splice(index, 1);
    },
    increaseQuantity(index) {
      if (this.basket[index].quantity === this.basket[index].maxQuantity) {
        this.basket[index].validQuantity = false;
      } else {
        this.basket[index].quantity++;
        this.basket[index].totalPrice =
          this.basket[index].quantity * this.basket[index].price;
      }
    },
    decreaseQuantity(index) {
      this.basket[index].quantity--;
      this.basket[index].totalPrice =
        this.basket[index].quantity * this.basket[index].price;
      if (this.basket[index].quantity === 0) {
        this.removeProduct(index);
      }
      this.basket[index].validQuantity = true;
    },
    clearProductAddFrom() {
      this.product = {
        name: "",
        price: 0,
        quantity: 0,
        maxQuantity: 0,
        totalPrice: 0,
        validQuantity: true,
      };
    },
  },
};
</script>

<template>
  <div id="app">
    <header>
      <img src="images/logo-les-bonnes-pieces.png" alt="LOGO">
      <h1>Les Bonnes Pièces</h1>
      <div class="cart">Panier ({{ cart.length }})</div>
    </header>

    <main>
      <section class="filtres">
        <h3>Filtres</h3>
        <input type="text" v-model="searchTerm" placeholder="Rechercher une pièce...">
        <select v-model="selectedCategory">
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <label>
          <input type="checkbox" v-model="showAvailableOnly">
          Afficher seulement les disponibles
        </label>
        <div class="tri">
          <label>Trier par prix :</label>
          <select v-model="sortOrder">
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </div>
      </section>

      <section class="fiches">
        <div v-for="piece in filteredAndSortedPieces" :key="piece.id" class="fiche">
          <img :src="'/images/' + piece.Image" :alt="piece.nom">
          <h3>{{ piece.nom }}</h3>
          <p class="categorie">{{ piece.categorie }}</p>
          <p class="prix">{{ piece.prix }} €</p>
          <p :class="{'disponible': piece.Disponible, 'non-disponible': !piece.Disponible}">
            {{ piece.Disponible ? 'En stock' : 'Hors stock' }}
          </p>
          <button @click="addToCart(piece)" :disabled="!piece.Disponible">Ajouter au panier</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>

import piecesModule from './pieces.js';

export default {
  name: 'App',
  data() {
    return {
      ...piecesModule.data(),
    };
  },
  computed: {
    categories() {
      return piecesModule.computed.categories.call(this);
    },
    filteredPieces() {
      return piecesModule.computed.filteredPieces.call(this);
    },
    filteredAndSortedPieces() {
      return piecesModule.computed.filteredAndSortedPieces.call(this);
    }
  },
  methods: {
    addToCart(piece) {
      piecesModule.methods.addToCart.call(this, piece);
    }
  },
  mounted() {
    piecesModule.mounted.call(this);
  }
};
</script>

<style src="./styles.css"></style>

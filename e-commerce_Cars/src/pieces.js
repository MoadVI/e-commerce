export default {
  data() {
    return {
      pieces: [],
      searchTerm: '',
      selectedCategory: '',
      showAvailableOnly: false, 
      sortOrder: 'asc',
      cart: [],
    };
  },
  computed: {
    categories() {
      return [...new Set(this.pieces.map(p => p.categorie))];
    },
    filteredPieces() {
      return this.pieces.filter(piece => {
        const matchesSearch = piece.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = !this.selectedCategory || piece.categorie === this.selectedCategory;
        const matchesAvailability = !this.showAvailableOnly || piece.Disponible;
        return matchesSearch && matchesCategory && matchesAvailability;
      });
    },
    filteredAndSortedPieces() {
      return this.filteredPieces.slice().sort((a, b) => {
        return this.sortOrder === 'asc' ? a.prix - b.prix : b.prix - a.prix;
      });
    }
  },
  methods: {
    addToCart(piece) {
      if (piece.Disponible) {
        this.cart.push(piece);
      }
    }
  },
  mounted() {
    fetch('pieces-autos.json')  // Make sure your JSON file is correctly named and located
      .then(response => response.json())
      .then(data => {
        this.pieces = data;
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }
};


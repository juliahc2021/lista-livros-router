<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Minha lista de livros</h1>
    <v-form>
      <v-text-field
        label="Novo Livro"
        v-model="novoLivro"
        @keydown.enter="adicionar"
      >
        <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
      </v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="livro of livros" :key="livro.id">
          {{ livro.titulo }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novoLivro: "",
      livros: [],
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscarLivrosDoServidor();
  },
  methods: {
    async buscarLivrosDoServidor() {
      this.livros = [];
      const logTasks = await fb.tasksCollection
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.livros.push({
          id: doc.id,
          titulo: doc.data().titulo,
        });
      }
    },
    async adicionar() {
      await fb.tasksCollection.add({
        titulo: this.novoLivro,
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.novoLivro = "";
      this.buscarLivrosDoServidor();
    },
  },
};
</script>

<style>
</style>
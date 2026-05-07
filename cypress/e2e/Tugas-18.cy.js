describe('API Testing Categories', () => {

  it('Get all categories', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property('id', 1)
      expect(response.body[0]).to.have.property('name', 'Mila Updated Version')
      expect(response.body[0]).to.have.property('slug', 'mila-updated-version')
    })
  })

  it('Get a single category by ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name', 'Mila Updated Version')
      expect(response.body).to.have.property('slug', 'mila-updated-version')
    })
  })

  it('Get a single category by slug', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/slug/mila-updated-version' // slug/..., bisa di isi sesuai slug
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name', 'Mila Updated Version')
      expect(response.body).to.have.property('slug', 'mila-updated-version')
    })
  })

  it('Create a category', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories',
      body: {
        name: 'Test 123', // bisa diganti namenya supaya tidak eror
        image: 'https://placeimg.com/640/480/any'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name', 'Test 123')
      expect(response.body).to.have.property('image', 'https://placeimg.com/640/480/any')
    })
  })

  it('Update a category', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      body: {
        name: 'Mila Updated Version 1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Mila Updated Version 1')
    })
  })

  it('Delete a category', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/18' // id nya bisa diganti supaya bisa dihapus
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('true')
    })
  })

  it('Get all products by category', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1/products'
    }).then((response) => {
      expect(response.status).to.eq(200)
      // Memastikan produk pertama dalam kategori memiliki ID dan Title
      expect(response.body[0]).to.have.property('id', 1)
      expect(response.body[0]).to.have.property('title', 'Majestic Mountain Graphic T-Shirt')
    })
  })

})
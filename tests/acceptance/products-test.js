import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Product', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /products without data', function(assert) {
  visit('/products');

  andThen(function() {
    assert.equal(currentPath(), 'products.index');
    assert.equal(find('#blankslate').text().trim(), 'No Products found');
  });
});

test('visiting /products with data', function(assert) {
  server.create('product');
  visit('/products');

  andThen(function() {
    assert.equal(currentPath(), 'products.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new product', function(assert) {
  visit('/products');
  click('a:contains(New Product)');

  andThen(function() {
    assert.equal(currentPath(), 'products.new');

    fillIn('label:contains(Title) input', 'MyString');
    fillIn('label:contains(Price) input', 'MyString');
    fillIn('label:contains(Size) input', 'MyString');
    fillIn('label:contains(Image) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing product', function(assert) {
  server.create('product');
  visit('/products');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'products.edit');

    fillIn('label:contains(Title) input', 'MyString');
    fillIn('label:contains(Price) input', 'MyString');
    fillIn('label:contains(Size) input', 'MyString');
    fillIn('label:contains(Image) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing product', function(assert) {
  server.create('product');
  visit('/products');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'products.show');

    assert.equal(find('p strong:contains(Title:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Price:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Size:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Image:)').next().text(), 'MyString');
  });
});

test('delete a product', function(assert) {
  server.create('product');
  visit('/products');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'products.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});

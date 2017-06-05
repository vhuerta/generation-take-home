/**
 * Simple object to wrap the localStorage
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

export default {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    let value = localStorage.getItem(key);

    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch (e) {
        /* Fail to parse the string so return it */
      }
    }
    return value;
  }
};

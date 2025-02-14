import { Ship } from '../components/ship.js'

describe("Ship", () => {
  
  describe("instantiation", () => {
    const carrier = new Ship(5);
    it("should construct a new ship instance", () => {
      expect(carrier.getSize()).toBe(5);
    })
  })
  
  describe("hits", () => {
    const carrier = new Ship(5);
    describe("when there are none", () => {
      it("getHits() returns an empty array", () => {
        expect(carrier.getHits()).toEqual(0);
      })
    })
    
    describe("when there are some", () => {
      it("getHits() returns an array filled with hit coords", () => {
        expect(carrier.getHits()).toEqual(0);
        carrier.hit()
        expect(carrier.getHits()).toEqual(1);
      })
      
      it("they cannot exceed the size of the ship", () => {
        const carrier = new Ship(5);
        for (let i = 0; i < carrier.getSize(); i++) {
          carrier.hit();
        }
        expect(carrier.getHits()).toBe(5);
        expect(carrier.hit()).toEqual("cannot receive more hits than ship's size");
      })
    })
  })
  
  describe("isSunk()", () => {
    const carrier = new Ship(5);

    it("returns false if hits < size", () => {
      expect(carrier.isSunk()).toBeFalsy()
    })
    
    it("returns true if hits === size", () => {
      for (let i = 0; i < carrier.getSize(); i++) {
        carrier.hit();
      }
      expect(carrier.getSize()).toBe(5);
      expect(carrier.getHits()).toBe(5);
      expect(carrier.isSunk()).toBeTruthy();
    })
  })

})
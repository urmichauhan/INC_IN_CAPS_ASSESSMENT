import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primecount',
  templateUrl: './primecount.component.html',
  styleUrls: ['./primecount.component.scss']
})
export class PrimecountComponent implements OnInit {
  public numbers: any = "";
  public results: any = [];
  public submitted: boolean = false;
  public showNote:boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * @description Calculate Number is prime or not from an array
   */
  calculatePrimeNumber(numberdata) {
    console.log(numberdata)
    this.submitted = true;
    if (this.numbers && numberdata.valid && this.numbers.indexOf(',,') === -1) {
      this.results = [];
      let arrayData = [...new Set(this.numbers.split(","))];
      let isPrime = (num) => {
        if (num <= 1) return false;
        if (num % 2 == 0 && num > 2) return false;
        let s = Math.sqrt(num);
        for (let i = 3; i <= s; i++) {
          if (num % i === 0)
            return false;
        }
        return true;
      }
      for (let num = 0; num < arrayData.length; num++) {
        this.results.push(`${arrayData[num]} ${isPrime(arrayData[num]) ? 'is' : 'is not'} prime number`)
        // console.log(`${arrayData[num]} ${isPrime(arrayData[num]) ? 'is' : 'is not'} prime number`);
      }
      this.submitted = false;
    }

  }

}

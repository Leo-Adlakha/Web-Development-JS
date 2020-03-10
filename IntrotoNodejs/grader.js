function average(a){
    var sum = 0 ;
    for ( var i = 0 ; i < a.length ; i++ ){
        sum += a[i] ;
    }
    var avg = sum / a.length ;
    if ( avg % 1 < 0.5 ){
        avg = Math.floor(avg) ;
    }
    else{
        avg = Math.ceil(avg) ;
    }
    return avg ;
}

var scores = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49] ;
console.log(average(scores)) ;
// Generated by LiveScript 1.4.0
/**
 * @package   Blockchain payment
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var L;
  L = cs.Language('blockchain_payment_');
  Polymer({
    is: 'cs-blockchain-payment-pay',
    properties: {
      description: '',
      address: '',
      amount: Number,
      progress_text: {
        type: String,
        value: L.waiting_for_payment
      }
    },
    ready: function(){
      this.set('description', JSON.parse(this.description));
      this.set('text', L.scan_or_transfer(this.amount, this.address));
      new QRCode(this.$.qr, {
        height: 512,
        text: 'bitcoin:' + this.address + '?amount=' + this.amount,
        width: 512
      });
      this.update_status();
    },
    update_status: function(){
      var this$ = this;
      cs.api('get api/Blockchain_payment/' + this.dataset.id).then(function(data){
        if (parseInt(data.confirmed)) {
          location.reload();
          return;
        }
        if (parseInt(data.paid)) {
          this$.set('progress_text', L.waiting_for_confirmations);
        }
        setTimeout(bind$(this$, 'update_status'), 5000);
      });
    }
  });
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

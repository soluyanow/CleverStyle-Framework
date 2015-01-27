<?php
/**
 * @package    Shop
 * @attribute  modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright  Copyright (c) 2015, Nazar Mokrynskyi
 * @license    MIT License, see license.txt
 */
namespace cs\modules\Shop;
use
	cs\Config,
	cs\Language\Prefix,
	cs\Trigger;

Trigger::instance()
	->register(
		'System/payment/success',
		function ($data) {
			if ($data['module'] != 'Shop') {
				return;
			}
			$purpose = explode('/', $data['purpose']);
			if ($purpose[0] != 'orders') {
				return;
			}
			$Config = Config::instance();
			$Orders = Orders::instance();
			$order  = $Orders->get($purpose[1]);
			$Orders->set(
				$order['id'],
				$order['user'],
				$order['shipping_type'],
				$order['shipping_cost'],
				$order['shipping_username'],
				$order['shipping_phone'],
				$order['shipping_address'],
				$order['payment_method'],
				1,
				$order['status'],
				$order['comment']
			);
			$Orders->set_status(
				$purpose[1],
				$Config->module('Shop')->default_paid_order_status,
				'' // TODO: possibly some comment message here
			);
			$L = new Prefix('shop_');
			interface_off();
			header('Location: '.$Config->core_url().'/'.path($L->shop).'/'.path($L->orders).'/?paid_success='.(int)$purpose[1]);
		}
	)
	->register(
		'System/payment/error',
		function ($data) {
			if ($data['module'] != 'Shop') {
				return;
			}
			$purpose = explode('/', $data['purpose']);
			if ($purpose[0] != 'orders') {
				return;
			}
			$Config = Config::instance();
			$L      = new Prefix('shop_');
			interface_off();
			header('Location: '.$Config->core_url().'/'.path($L->shop).'/'.path($L->orders).'/?paid_error='.(int)$purpose[1]);
		}
	);

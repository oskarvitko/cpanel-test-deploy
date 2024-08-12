<?php

$secret = 'test-secret'; // Задайте секретный ключ

// Получаем данные из GitHub Webhook
$input = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

// Проверка подписи
if (hash_hmac('sha1', $input, $secret) === $signature) {
    // Выполняем команды деплоя
    shell_exec('cd /hosting1/benzoxby/repositories/cpanel-test-deploy && git pull origin master');
    shell_exec('npm install --production');
    shell_exec('touch /tmp/restart.txt');
}

?>
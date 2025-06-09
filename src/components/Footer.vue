<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 py-12">
      <!-- Contenido principal del footer -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Marca y descripción -->
        <div class="md:col-span-1">
          <div class="flex items-center mb-4">
            <img src="/src/logo.png" alt="LaBloom" class="h-8 w-auto mr-3" />
            <span class="text-xl font-bold text-gray-800">LaBloom</span>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed">
            Creando belleza floral con pasión desde 2025. Tu floristería de confianza.
          </p>
        </div>

        <!-- Enlaces principales -->
        <div>
          <h3 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Empresa</h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/sobre-nosotros"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Sobre nosotros
              </router-link>
            </li>
            <li>
              <router-link
                to="/contacto"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Contacto
              </router-link>
            </li>
            <li>
              <router-link
                to="/blog"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Blog
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Soporte -->
        <div>
          <h3 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Soporte</h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/preguntas-frecuentes"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                FAQ
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/aviso-legal"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Aviso Legal
              </router-link>
            </li>
            <li>
              <router-link
                to="/privacy-policy"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Privacidad
              </router-link>
            </li>
            <li>
              <router-link
                to="/condiciones-de-uso"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Condiciones de uso
              </router-link>
            </li>
            <li>
              <router-link
                to="/condiciones-venta"
                class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Condiciones de venta
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Separador -->
      <hr class="border-gray-200 mb-6" />

      <!-- Footer inferior -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm mb-4 md:mb-0">
          © 2024 LaBloom. Todos los derechos reservados.
        </p>

        <!-- Redes sociales  -->
        <div class="flex space-x-4">
          <a
            href="#"
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Instagram"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12.017 0C8.396 0 8.001.01 6.784.048 5.566.088 4.83.22 4.196.42a3.86 3.86 0 0 0-1.393.91A3.86 3.86 0 0 0 .894 3.725c-.2.634-.333 1.37-.372 2.588C.484 7.53.475 7.925.475 11.547s.009 4.017.047 5.234c.04 1.218.172 1.954.372 2.588a3.86 3.86 0 0 0 .91 1.393 3.86 3.86 0 0 0 1.393.91c.634.2 1.37.333 2.588.372 1.217.038 1.612.047 5.234.047s4.017-.009 5.234-.047c1.218-.04 1.954-.172 2.588-.372a3.86 3.86 0 0 0 1.393-.91 3.86 3.86 0 0 0 .91-1.393c.2-.634.333-1.37.372-2.588.038-1.217.047-1.612.047-5.234s-.009-4.017-.047-5.234c-.04-1.218-.172-1.954-.372-2.588a3.86 3.86 0 0 0-.91-1.393A3.86 3.86 0 0 0 18.23.894c-.634-.2-1.37-.333-2.588-.372C14.425.484 14.03.475 10.408.475s-4.017.009-5.234.047zm-.49 21.542c-3.547 0-4.002-.014-5.4-.052-1.35-.037-2.085-.166-2.574-.275a4.297 4.297 0 0 1-1.566-1.02 4.297 4.297 0 0 1-1.02-1.566c-.109-.489-.238-1.224-.275-2.574-.038-1.398-.052-1.853-.052-5.4s.014-4.002.052-5.4c.037-1.35.166-2.085.275-2.574a4.297 4.297 0 0 1 1.02-1.566 4.297 4.297 0 0 1 1.566-1.02c.489-.109 1.224-.238 2.574-.275 1.398-.038 1.853-.052 5.4-.052s4.002.014 5.4.052c1.35.037 2.085.166 2.574.275a4.297 4.297 0 0 1 1.566 1.02 4.297 4.297 0 0 1 1.02 1.566c.109.489.238 1.224.275 2.574.038 1.398.052 1.853.052 5.4s-.014 4.002-.052 5.4c-.037 1.35-.166 2.085-.275 2.574a4.297 4.297 0 0 1-1.02 1.566 4.297 4.297 0 0 1-1.566 1.02c-.489.109-1.224.238-2.574.275-1.398.038-1.853.052-5.4.052z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Facebook"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

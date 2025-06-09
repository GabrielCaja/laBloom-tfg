<template>
  <Navbar />
  <!-- Breadcumbs -->
  <div class="bg-gray-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-indigo-600 transition-colors">
          <span class="flex items-center"> Inicio </span>
        </router-link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 mx-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-medium text-gray-900">Aviso Legal</span>
      </div>
    </div>
  </div>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6"
        >
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Aviso Legal</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Información legal y normativa aplicable a LaBloom
        </p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Section 1 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">1</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Identificación del Titular</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la
                información y de comercio electrónico, se informa que:
              </p>
              <div class="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <div class="space-y-2 text-sm text-gray-700">
                  <div><strong>Denominación social:</strong> LaBloom S.L.</div>
                  <div><strong>CIF:</strong> B-12235678</div>
                  <div><strong>Domicilio:</strong> 28001 Madrid, España</div>
                  <div><strong>Teléfono:</strong> +34 627418399</div>
                  <div><strong>Email:</strong> info@labloom.com</div>
                  <div>
                    <strong>Registro Mercantil:</strong> Madrid, Tomo 1234, Folio 567, Hoja M-89012
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">2</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Objeto y Ámbito de Aplicación</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              El presente aviso legal regula el uso del sitio web www.labloom.com, propiedad de
              LaBloom S.L. La utilización del sitio web atribuye la condición de usuario del mismo e
              implica la aceptación plena de todas las cláusulas de este aviso legal.
            </p>
          </section>

          <!-- Section 3 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">3</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Condiciones de Acceso y Uso</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                El sitio web y sus servicios son de acceso libre y gratuito. No obstante, algunos
                servicios están condicionados a la previa cumplimentación del correspondiente
                formulario.
              </p>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start space-x-2">
                  <span class="text-amber-500 mt-1">•</span>
                  <span>El usuario se compromete a hacer un uso adecuado de los contenidos</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-amber-500 mt-1">•</span>
                  <span>No emplear los contenidos con fines ilícitos o prohibidos</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-amber-500 mt-1">•</span>
                  <span>No causar daños en los sistemas informáticos del proveedor</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Section 4 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">4</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">
                Propiedad Intelectual e Industrial
              </h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              LaBloom S.L. es titular de todos los derechos de propiedad intelectual e industrial
              del sitio web, así como de los elementos contenidos en el mismo (a título enunciativo
              y no exhaustivo, imágenes, sonido, audio, vídeo, software o textos, marcas o
              logotipos, combinaciones de colores, estructura y diseño).
            </p>
          </section>

          <!-- Section 5 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">5</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Exclusión de Responsabilidades</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                LaBloom S.L. se exime de cualquier tipo de responsabilidad derivada de:
              </p>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <div class="flex items-start space-x-3">
                  <svg
                    class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="text-sm text-yellow-800">
                    <ul class="space-y-1">
                      <li>• La imposibilidad de acceso al sitio web</li>
                      <li>• Los errores o interrupciones en el sitio web</li>
                      <li>• Los virus que puedan infectar el equipo del usuario</li>
                      <li>• Los daños causados por terceros mediante intromisiones ilegítimas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 6 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">6</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Modificaciones</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              LaBloom S.L. se reserva el derecho de efectuar sin previo aviso las modificaciones que
              considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los
              contenidos y servicios que se presten a través de la misma como la forma en la que
              éstos aparezcan presentados o localizados en su portal.
            </p>
          </section>

          <!-- Section 7 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">7</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Enlaces</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros
              sitios de Internet, LaBloom S.L. no ejercerá ningún tipo de control sobre dichos
              sitios y contenidos. En ningún caso asumirá responsabilidad alguna por los contenidos
              de algún enlace perteneciente a un sitio web ajeno.
            </p>
          </section>

          <!-- Section 8 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span class="text-amber-600 font-semibold text-sm">8</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">
                Legislación Aplicable y Jurisdicción
              </h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              La relación entre LaBloom S.L. y el usuario se regirá por la normativa española
              vigente y cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad
              de Madrid, salvo disposición legal en contrario.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

const volver = () => {
  router.go(-1)
}
</script>

<style scoped></style>
